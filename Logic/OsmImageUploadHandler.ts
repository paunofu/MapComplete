/**
 * Helps in uplaoding, by generating the rigth title, decription and by adding the tag to the changeset
 */
import {UIEventSource} from "../UI/UIEventSource";
import {ImageUploadFlow} from "../UI/ImageUploadFlow";
import {Changes} from "./Changes";
import {UserDetails} from "./OsmConnection";

export class OsmImageUploadHandler {
    private _tags: UIEventSource<any>;
    private _changeHandler: Changes;
    private _userdetails: UIEventSource<UserDetails>;

    constructor(tags: UIEventSource<any>,
                userdetails: UIEventSource<UserDetails>,
                changeHandler: Changes
    ) {
        if (tags === undefined || userdetails === undefined || changeHandler === undefined) {
            throw "Something is undefined"
        }
        this._tags = tags;
        this._changeHandler = changeHandler;
        this._userdetails = userdetails;
    }

    private generateOptions(license: string) {
        const tags = this._tags.data;

        const title = tags.name ?? "Unknown area";
        const description = [
            "author:" + this._userdetails.data.name,
            "license:" + license,
            "wikidata:" + tags.wikidata,
            "osmid:" + tags.id,
            "name:" + tags.name
        ].join("\n");

        const changes = this._changeHandler;
        return {
            title: title,
            description: description,
            handleURL: function (url) {
                let freeIndex = 0;
                while (tags["image:" + freeIndex] !== undefined) {
                    freeIndex++;
                }
                console.log("Adding image:" + freeIndex, url);
                changes.addChange(tags.id, "image:" + freeIndex, url);
            },
            allDone: function () {
                changes.uploadAll(function () {
                    console.log("Writing changes...")
                });
            }
        }
    }

    getUI(): ImageUploadFlow {
        const self = this;
        return new ImageUploadFlow(
            this._userdetails,
            function (license) {
                return self.generateOptions(license)
            }
        );
    }


}