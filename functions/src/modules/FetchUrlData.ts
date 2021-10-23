import {ImportData, PipelineModule} from "../Pipeline";
import axios from "axios";
import * as cheerio from "cheerio";


export class FetchUrlData implements PipelineModule{

    async run(imp: ImportData) {

        try {
            const {data} = await axios.get(imp._url);
            imp.$ = cheerio.load(data, {xmlMode: false, decodeEntities: true});
        } catch (error) {
            throw error;
        }
    }
}
