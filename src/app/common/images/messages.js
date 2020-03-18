import {defineMessages} from 'react-intl';

export const messages = defineMessages({

    title: {id: "common.imageResizer.title", defaultMessage: "Adjust the size of the upload"},
    description: {
        id: "common.imageResizer.description",
        defaultMessage: "Your image is very large, we suggest you resize the image before sending it to the server in order to decrease the loading time."
    },
    uploadOriginalImage:  {id: "common.imageResizer.uploadOriginalImage", defaultMessage: "Upload original image"},
    uploadResizedImage:  {id: "common.imageResizer.uploadResizedImage", defaultMessage: "Upload resized image"},
    cancelUpload:  {id: "common.imageResizer.cancelUpload", defaultMessage: "Cancel upload"},

    originalInfo:  {id: "common.imageResizer.originalInfo", defaultMessage: "The size of the original image is <b>{size}</b>."},
    originalInfoEx:  {id: "common.imageResizer.originalInfoEx", defaultMessage: "The size of the original image is <b>{size}</b> its dimensions are <b>{width}x{height}</b> (<b>{mpx} mpx</b>)."},

    computingResizedInfo:  {id: "common.imageResizer.computingResizedInfo", defaultMessage: "Computing the resized image ..."},
    resizedInfo:  {id: "common.imageResizer.resizedInfo", defaultMessage: "The resized image will be <b>{size}</b> (<b>{percent}%</b>) its dimensions will be <b>{width}x{height}</b> (<b>{mpx} mpx</b>)."},

    reduceLess: {id: "common.imageResizer.reduceLess", defaultMessage: "Increase file size"},
    reduceMore: {id: "common.imageResizer.reduceMore", defaultMessage: "Decrease file size"},
});
