import {Groen} from "./Layouts/Groen";
import {Toilets} from "./Layouts/Toilets";
import {GRB} from "./Layouts/GRB";
import {Statues} from "./Layouts/Statues";
import {Bookcases} from "./Layouts/Bookcases";
import Cyclofix from "./Layouts/Cyclofix";
import {All} from "./Layouts/All";
import {Layout} from "./Layout";

export class AllKnownLayouts {
    public static allSets = AllKnownLayouts.AllLayouts();

    private static AllLayouts(): Map<string, Layout> {
        const all = new All();
        const layouts : Layout[] = [
            new Groen(),
            new GRB(),
            new Cyclofix(),
            new Bookcases(),
            all
            /*new Toilets(),
            new Statues(),
            */
        ];
        const allSets: Map<string, Layout> = new Map();
        for (const layout of layouts) {
            allSets[layout.name] = layout;
            all.layers = all.layers.concat(layout.layers);
        }
        return allSets;
    }
}
