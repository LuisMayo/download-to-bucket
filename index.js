/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.downloadFile = (req, res) => {
    const url = req.body.url;
    const fileName = req.body.fileName;
    const child_process = require('child_process');

    var wget = 'wget'+' -O /tmp/' + fileName + ' ' + url;
  // excute wget using child_process' exec function

  child_process.execSync(wget);
    // Imports the Google Cloud client library
    const { Storage } = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage();
    const bucketName = 'YOUR-BUCKET-NAME';
    const filename = '/tmp/' + fileName;

    // Uploads a local file to the bucket
    storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            cacheControl: 'no-cache',
        },
    });

    res.status(200).send(`${filename} uploaded to ${bucketName}.`);

};
