import $ from 'jQuery';
import optionsUtils from 'Options/optionsUtils.js';

(async function onPageLoad() {
  console.log('onPageLoad');

  const options = await optionsUtils.getOptions();
  console.log(options);
  generatePage(options);
})(); // PageLoad時に実行する。

function generatePage(options) {
  // Optionsページを開くボタン
  document.getElementById('openOptions').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

  applyPageFromOptions(options);

  console.log('generatePage: options: ', options);

  // saveボタン
  $('#btnSave').on('click', () => {
    applyOptionsFromPage(options);
    optionsUtils.saveOptions(options);
  });

  // loadDefaultボタン
  $('#btnLoadDefault').on('click', async () => {
    const defaultOptions = await optionsUtils.getDefaultOptions();
    applyPageFromOptions(defaultOptions);
  });

  // loadCurrentボタン
  $('#btnLoadCurrent').on('click', async () => {
    const options = await optionsUtils.getOptions();
    applyPageFromOptions(options);
  });
}

/**
 * optionsの要素に、optionsページの要素の値を代入します。
 * see: applyPageFromOptions, 類似関数にapplyPageFromOptionsがあることに注意してください。
 * @param {array} options
 * @return {array} page内容が代入されたoptions
 */
function applyOptionsFromPage(options) {
  console.log('applyOptionsFromPage: ', options);
  options.extentionEnable = $('#extentionEnable').prop('checked');
  options.topPageEnable = $('#topPageEnable').prop('checked');
  return options;
}

/**
 * optionsページに、引数のoptionsの要素の値を適用します。
 * see: applyOptionsFromPage, 類似関数にapplyOptionsFromPageがあることに注意してください。
 * @param {array} options
 */
function applyPageFromOptions(options) {
  console.log('applyPageFromOptions: ', options);
  // ページに設定を反映
  $('#extentionEnable').prop('checked', options.extentionEnable);
  $('#topPageEnable').prop('checked', options.topPageEnable);
}
