import LayoutConfig from "../Models/ThemeConfig/LayoutConfig"
import { QueryParameters } from "./Web/QueryParameters"
import { AllKnownLayouts } from "../Customizations/AllKnownLayouts"
import { FixedUiElement } from "../UI/Base/FixedUiElement"
import { Utils } from "../Utils"
import Combine from "../UI/Base/Combine"
import { SubtleButton } from "../UI/Base/SubtleButton"
import BaseUIElement from "../UI/BaseUIElement"
import { UIEventSource } from "./UIEventSource"
import { LocalStorageSource } from "./Web/LocalStorageSource"
import LZString from "lz-string"
import { FixLegacyTheme } from "../Models/ThemeConfig/Conversion/LegacyJsonConvert"
import { LayerConfigJson } from "../Models/ThemeConfig/Json/LayerConfigJson"
import known_layers from "../assets/generated/known_layers.json"
import { PrepareTheme } from "../Models/ThemeConfig/Conversion/PrepareTheme"
import licenses from "../assets/generated/license_info.json"
import TagRenderingConfig from "../Models/ThemeConfig/TagRenderingConfig"
import { FixImages } from "../Models/ThemeConfig/Conversion/FixImages"
import Svg from "../Svg"
import questions from "../assets/generated/layers/questions.json"
import {
    DoesImageExist,
    PrevalidateTheme,
    ValidateTagRenderings,
    ValidateThemeAndLayers,
} from "../Models/ThemeConfig/Conversion/Validation"
import { DesugaringContext } from "../Models/ThemeConfig/Conversion/Conversion"
import { RewriteSpecial } from "../Models/ThemeConfig/Conversion/PrepareLayer"
import { TagRenderingConfigJson } from "../Models/ThemeConfig/Json/TagRenderingConfigJson"
import Hash from "./Web/Hash"

export default class DetermineLayout {
    private static readonly _knownImages = new Set(Array.from(licenses).map((l) => l.path))
    private static readonly loadCustomThemeParam = QueryParameters.GetQueryParameter(
        "userlayout",
        "false",
        "If not 'false', a custom (non-official) theme is loaded. This custom layout can be done in multiple ways: \n\n- The hash of the URL contains a base64-encoded .json-file containing the theme definition\n- The hash of the URL contains a lz-compressed .json-file, as generated by the custom theme generator\n- The parameter itself is an URL, in which case that URL will be downloaded. It should point to a .json of a theme"
    )
    public static getCustomDefinition(): string {
        const layoutFromBase64 = decodeURIComponent(DetermineLayout.loadCustomThemeParam.data)

        if (layoutFromBase64.startsWith("http")) {
            return layoutFromBase64
        }

        if (layoutFromBase64 !== "false") {
            // We have to load something from the hash (or from disk)
            const hash = Hash.hash.data
            try {
                JSON.parse(atob(hash))
                return atob(hash)
            } catch (e) {
                // We try to decode with lz-string
                JSON.parse(Utils.UnMinify(LZString.decompressFromBase64(hash)))
                return Utils.UnMinify(LZString.decompressFromBase64(hash))
            }
        }
        return undefined
    }

    /**
     * Gets the correct layout for this website
     */
    public static async GetLayout(): Promise<LayoutConfig | undefined> {
        const layoutFromBase64 = decodeURIComponent(DetermineLayout.loadCustomThemeParam.data)

        if (layoutFromBase64.startsWith("http")) {
            return await DetermineLayout.LoadRemoteTheme(layoutFromBase64)
        }

        if (layoutFromBase64 !== "false") {
            // We have to load something from the hash (or from disk)
            return DetermineLayout.LoadLayoutFromHash(DetermineLayout.loadCustomThemeParam)
        }

        let layoutId: string = undefined

        const path = window.location.pathname.split("/").slice(-1)[0]
        if (path !== "theme.html" && path !== "") {
            layoutId = path
            if (path.endsWith(".html")) {
                layoutId = path.substr(0, path.length - 5)
            }
            console.log("Using layout", layoutId)
        }
        layoutId = QueryParameters.GetQueryParameter(
            "layout",
            layoutId,
            "The layout to load into MapComplete"
        ).data
        const layout = AllKnownLayouts.allKnownLayouts.get(layoutId?.toLowerCase())
        if (layout === undefined) {
            throw "No builtin map theme with name " + layoutId + " exists"
        }
        return layout
    }

    public static LoadLayoutFromHash(userLayoutParam: UIEventSource<string>): LayoutConfig | null {
        let hash = location.hash.substr(1)
        let json: any

        // layoutFromBase64 contains the name of the theme. This is partly to do tracking with goat counter
        const dedicatedHashFromLocalStorage = LocalStorageSource.Get(
            "user-layout-" + userLayoutParam.data?.replace(" ", "_")
        )
        if (dedicatedHashFromLocalStorage.data?.length < 10) {
            dedicatedHashFromLocalStorage.setData(undefined)
        }

        const hashFromLocalStorage = LocalStorageSource.Get("last-loaded-user-layout")
        if (hash.length < 10) {
            hash = dedicatedHashFromLocalStorage.data ?? hashFromLocalStorage.data
        } else {
            console.log("Saving hash to local storage")
            hashFromLocalStorage.setData(hash)
            dedicatedHashFromLocalStorage.setData(hash)
        }

        try {
            json = JSON.parse(atob(hash))
        } catch (e) {
            // We try to decode with lz-string
            json = JSON.parse(Utils.UnMinify(LZString.decompressFromBase64(hash)))
        }

        const layoutToUse = DetermineLayout.prepCustomTheme(json)
        userLayoutParam.setData(layoutToUse.id)
        return layoutToUse
    }

    public static ShowErrorOnCustomTheme(
        intro: string = "Error: could not parse the custom layout:",
        error: BaseUIElement,
        json?: any
    ) {
        new Combine([
            intro,
            error.SetClass("alert"),
            new SubtleButton(Svg.back_svg(), "Go back to the theme overview", {
                url: window.location.protocol + "//" + window.location.host + "/index.html",
                newTab: false,
            }),
            json !== undefined
                ? new SubtleButton(Svg.download_svg(), "Download the JSON file").onClick(() => {
                      Utils.offerContentsAsDownloadableFile(
                          JSON.stringify(json, null, "  "),
                          "theme_definition.json"
                      )
                  })
                : undefined,
        ])
            .SetClass("flex flex-col clickable")
            .AttachTo("maindiv")
    }

    private static getSharedTagRenderings(): Map<string, TagRenderingConfigJson> {
        const dict = new Map<string, TagRenderingConfigJson>()

        for (const tagRendering of questions.tagRenderings) {
            dict.set(tagRendering.id, tagRendering)
        }

        return dict
    }

    private static prepCustomTheme(json: any, sourceUrl?: string, forceId?: string): LayoutConfig {
        if (json.layers === undefined && json.tagRenderings !== undefined) {
            const iconTr = json.mapRendering.map((mr) => mr.icon).find((icon) => icon !== undefined)
            const icon = new TagRenderingConfig(iconTr).render.txt
            json = {
                id: json.id,
                description: json.description,
                descriptionTail: {
                    en: "<div class='alert'>Layer only mode.</div> The loaded custom theme actually isn't a custom theme, but only contains a layer.",
                },
                icon,
                title: json.name,
                layers: [json],
            }
        }

        const knownLayersDict = new Map<string, LayerConfigJson>()
        for (const key in known_layers.layers) {
            const layer = known_layers.layers[key]
            knownLayersDict.set(layer.id, <LayerConfigJson>layer)
        }
        const convertState: DesugaringContext = {
            tagRenderings: DetermineLayout.getSharedTagRenderings(),
            sharedLayers: knownLayersDict,
            publicLayers: new Set<string>(),
        }
        json = new FixLegacyTheme().convertStrict(json, "While loading a dynamic theme")
        const raw = json

        json = new FixImages(DetermineLayout._knownImages).convertStrict(
            json,
            "While fixing the images"
        )
        json.enableNoteImports = json.enableNoteImports ?? false
        json = new PrepareTheme(convertState).convertStrict(json, "While preparing a dynamic theme")
        console.log("The layoutconfig is ", json)

        json.id = forceId ?? json.id

        {
            let { errors } = new PrevalidateTheme().convert(json, "validation")
            if (errors.length > 0) {
                throw "Detected errors: " + errors.join("\n")
            }
        }
        {
            let { errors } = new ValidateThemeAndLayers(
                new DoesImageExist(new Set<string>(), (_) => true),
                "",
                false
            ).convert(json, "validation")
            if (errors.length > 0) {
                throw "Detected errors: " + errors.join("\n")
            }
        }
        return new LayoutConfig(json, false, {
            definitionRaw: JSON.stringify(raw, null, "  "),
            definedAtUrl: sourceUrl,
        })
    }

    private static async LoadRemoteTheme(link: string): Promise<LayoutConfig | null> {
        console.log("Downloading map theme from ", link)

        new FixedUiElement(`Downloading the theme from the <a href="${link}">link</a>...`).AttachTo(
            "maindiv"
        )

        let parsed = await Utils.downloadJson(link)
        let forcedId = parsed.id
        const url = new URL(link)
        if (!(url.hostname === "localhost" || url.hostname === "127.0.0.1")) {
            forcedId = link
        }
        console.log("Loaded remote link:", link)
        return DetermineLayout.prepCustomTheme(parsed, link, forcedId)
    }
}