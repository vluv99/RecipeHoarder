import {ImportData, PipelineModule} from "../Pipeline";

const request = require('request');
const crypto = require('crypto');
const admin = require('firebase-admin')
admin.initializeApp()

const bucket = admin.storage().bucket();

export class ImageDownloader implements PipelineModule {

    run(imp: ImportData): Promise<void> {
        // Generate a random HEX string using crypto (a native node module).
        const randomFileName = crypto.randomBytes(16).toString('hex');

        // Fetch image info using a HTTP HEAD request.
        request.head(imp.r.image, (error: any, info: { headers: { [x: string]: any; }; }) => {
            if (error) {
                return console.error(error);
            }

            // Download image from Pixelz, then save the image to Firebase
            // using the Google Cloud API and the magic of Node Streams.
            // https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/v0.52.0/storage/file
            // http://stackoverflow.com/questions/28355079/how-do-node-js-streams-work
            request(imp.r.image)
                .pipe(
                    bucket.file(`sample/images/${randomFileName}`).createWriteStream({
                        metadata: {
                            contentType: info.headers['content-type']
                        }
                    })
                )
                .on('error', (err: any) => {

                    // Do something if the upload fails.
                    console.error(err);
                })
                .on('finish', () => {

                    // Do something when everything is done.
                    //imp.r.image = TODO: add image location

                    // Get download url for stored image
                    console.log('Image successfully uploaded to Firebase Storage!')
                });
        });

        return Promise.resolve(undefined);
    }

}
