import createFilePondInstance from "./filepond/main.js";

$(document).ready(function () {
    const filePondInstances = new Map();
    const fileUploaderFields = $(".filepond-wp-integration-upload");
    const filePondIntegration = wpFilePondIntegration || {};

    filePondIntegration.allowImagePreview = wpFilePondIntegration.allowImagePreview === "1";
    filePondIntegration.imagePreviewHeight = parseInt(wpFilePondIntegration.imagePreviewHeight);
    filePondIntegration.allowMultiple = wpFilePondIntegration.allowMultiple === "1";

    fileUploaderFields.each(function () {
        const configuration = Object.assign({}, getConfiguration($(this)), filePondIntegration);
        const filePondInstance = createFilePondInstance($(this)[0], configuration);

        filePondInstances.set(this, filePondInstance);
    });

    // On elementor form success, clear the filepond field
    $(document).on("submit_success", function (event, response) {
        filePondInstances.forEach((instance) => instance.removeFiles());
    });
});

function getConfiguration(fileInput) {
    const data = $(fileInput).data();

    return {
        acceptedFileTypes: data.filetypes.split(",") ?? null,
        allowMultiple: fileInput.attr("multiple") !== undefined,
        labelIdle: data.label ?? "",
        maxFileSize: data.filesize ? `${data.filesize}MB` : null,
        maxFiles: data.maxfiles ?? null
    }
}