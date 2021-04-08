# Melodikryzzet
[![melodikryzzet-tests](https://github.com/hankolsen/melodikryzzet/actions/workflows/test.yml/badge.svg)](https://github.com/hankolsen/melodikryzzet/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/hankolsen/melodikryzzet/badge.svg?branch=master)](https://coveralls.io/github/hankolsen/melodikryzzet?branch=master)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
A React app for creating and sharing crossword puzzles.

The inspiration for the project came from the idea of creating my own version of Melodikrysset (https://sverigesradio.se/melodikrysset), a Swedish radio show that has been running for at least 50 years.

I got annyoed by the fact that the official app didn't consider words in an angle so the user had to manually change the typing direction in the puzzle.
My solution automatically detect the next letter in the word and adjuts the direction of typing.

Demo at https://www.melodikryzzet.se/

# Setup
Requires `netlify-cli`. Use `brew install netlify-cli` to install it.

Copy `.env.example` to `.env` and add the settings for you MongoDB.

Start with `netlify dev`.



## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://hoier.se/"><img src="https://avatars.githubusercontent.com/u/5670416?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Johannes Höier</b></sub></a><br /><a href="#example-dacre" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!