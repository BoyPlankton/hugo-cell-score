# hugo-cell-score

A [Hugo](https://gohugo.io/) theme to generate a static site with historical [cycle score](https://fevgames.net/ingress/ingress-guide/ops/scores/) data for the augmented reality game [Ingress](https://ingress.com/).

## Credits

Originally based on the [nr13-romeo-08](https://nr13-romeo-08.com) created by captcynicism and maintained by Fragger.

## Dependencies

hugo-cell-score relies on code from the following open source projects:

* [jQuery](https://jquery.com)
* [jQuery UI](https://jqueryui.com)
* [Chart.js](https://www.chartjs.org)

## Live Demo

[AM01-ECHO-09](https://am01-echo-09.com/)

## Quick Start

1. Collect all the data into a spreadsheet with columns for Start Date, Year, Cycle, ENL, and RES. The columns should be self-explanatory and you collect the data from the historical scores screen within the app. The spreadsheet needs to be saved in CSV format for the theme to reference.
2. Add the repository into your Hugo Project repository as a submodule, `git submodule add https://github.com/BoyPlankton/hugo-cell-score.git themes/hugo-cell-score`.
3. Configure your `config.toml`. params needs to include a scoreCSV parameter that references the CSV created in the first step. This can be a URL (I use a published Google Sheet for mine).
4. Build your site with `hugo server` and see the result at `http://localhost:1313/`.

## License

hugo-cell-score is licensed under the [MIT license](https://github.com/BoyPlankton/hugo-cell-score/blob/main/LICENSE).

## Maintenance

This theme is maintained by its author [Vincent Marcus](https://github.com/BoyPlankton).