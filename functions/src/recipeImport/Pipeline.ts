import {Recipe} from "../../../shared/model/Recipe";
import * as cheerio from "cheerio";

export class ImportData {
    r: Recipe
    $?: cheerio.CheerioAPI
    _url: string


    constructor(r: Recipe, url: string, $?: cheerio.CheerioAPI) {
        this.r = r;
        this.$ = $;
        this._url = url;
    }
}

export interface PipelineModule {
    run(imp: ImportData):Promise<void>;
}

export class Pipeline {

    modules: Array<PipelineModule>

    constructor(m: Array<PipelineModule>) {
        this.modules = m
    }

    async run(r: Recipe) {
        let data:ImportData = new ImportData(r, r.url)
        for (const module of this.modules) {
            await module.run(data)
        }
    }
}
