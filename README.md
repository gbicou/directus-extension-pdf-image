# Directus Extension: PDF Image

[![npm version](https://badge.fury.io/js/%40bicou%2Fdirectus-extension-pdf-image.svg)](https://www.npmjs.com/package/@bicou/directus-extension-pdf-image)
[![npm downloads](https://img.shields.io/npm/dm/%40bicou%2Fdirectus-extension-pdf-image.svg)](https://www.npmjs.com/package/@bicou/directus-extension-pdf-image)
[![npm license](https://img.shields.io/npm/l/%40bicou%2Fdirectus-extension-pdf-image.svg)](https://github.com/gbicou/directus-extension-pdf-image/blob/main/LICENSE)

A Directus extension to create a screenshot image for each uploaded PDF document.

## Description

This extension uses the `pdf-to-img` library to generate an image from uploaded PDF files.
It is designed to work seamlessly with Directus, a headless CMS.

## Features

* Generate image from the first page from uploaded PDF files
* Store the generated image in PNG format in the Directus media library

## Installation

To install this extension, add the package to your directus project by running the following command:

```bash
pnpm install @bicou/directus-extension-pdf-image
```

## Usage

To use this extension, simply upload a PDF file to your Directus instance.
The extension will automatically generate an image from the PDF file.

## License

This extension is released under the [MIT License](https://github.com/gbicou/directus-extension-pdf-image/blob/main/LICENSE).
