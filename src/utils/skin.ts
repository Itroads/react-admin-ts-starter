/**
 * @author Jiang yang
 * 
 * @description 生成皮肤样式
 * @version 0.0.1
 */

import darkBlue from './skin-files/darkBlue'
import darkBlack from './skin-files/darkBlack'
import lightBlue from './skin-files/lightBlue'

const skin = {
  darkBlue,
  darkBlack,
  lightBlue
}

const getSkinStyle = (whichskin: any) => {
  if (!whichskin) {
    return '';
  }

  return `
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px ${whichskin.scrollbarTrackSh};
      background-color: ${whichskin.scrollbarTrackBg};
    }
    ::-webkit-scrollbar {
      width: 5px;
      background-color: ${whichskin.scrollbarBg};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${whichskin.scrollbarThumbBg};
      border: 2px solid ${whichskin.scrollbarThumbBorder};
    }
    .sk-txt {
      color: ${whichskin.txtColor};
    }
    .sk-index {
      color: ${whichskin.indexColor};
      background-color: ${whichskin.indexBgColor};
    }
    .sk-index-header {
      background-color: ${whichskin.indexHeaderBg};
      color: ${whichskin.indexColor};
    }
    .sk-index-left {
      background-color: ${whichskin.indexLeftBg};
    }
    .sk-index-right {
      background-color: ${whichskin.indexRightBg};
      border-left: 1px solid ${whichskin.indexRightBr};
    }
    .sk-index-content {
      background-color: ${whichskin.indexContentBg};
      color: ${whichskin.indexContentTxt};
    }
    .sk-index-footer {
      background-color: ${whichskin.indexFooterBg};
      box-shadow: 0 -1px 10px ${whichskin.indexFooterBs};
    }

    .sk-menu-title {
      background-color: ${whichskin.menuTitleBg};
      box-shadow: 0 1px 3px ${whichskin.menuTitleBs};
      color: ${whichskin.indexColor};
    }

    .sk-menu-top {
      background-color: ${whichskin.menuTopBg};
      border-bottom: 1px solid ${whichskin.menuTopBs};
    }
    .sk-menu-item {
      background-color: ${whichskin.menuItemBg};
    }
    .sk-menu-text {
      color: ${whichskin.indexColor};
    }
    .sk-menu-active {
      background-color: ${whichskin.menuActiveBg};
    }

    .sk-tabbox {
      background-color: ${whichskin.tabBoxBg};
      box-shadow: 0px 2px 2px ${whichskin.tabBoxBs};
    }
    .sk-tabbox-item {
      background-color: ${whichskin.tabBoxItemBg};
      color: ${whichskin.tabBoxItemTxt};
    }
    .sk-tabbox-active {
      background-color: ${whichskin.tabBoxActiveBg};
      color: ${whichskin.tabBoxActiveTxt};
    }
    .sk-tabbox-rb {
      border-right: 1px solid ${whichskin.tabBoxBr};
    }

    .sk-alert {
      background-color: ${whichskin.alertBg};
      box-shadow: 0px 0px 10px ${whichskin.alertBs};
      color: ${whichskin.alertC};
    }
    .sk-alert-header {
      background-color: ${whichskin.alertHeaderBg};
      color: ${whichskin.alertHeaderC};
      border-bottom: 1px solid ${whichskin.alertFooterBorder};
    }
    .sk-alert-footer {
      border-top: 1px solid ${whichskin.alertHeaderBorder};
    }
    
    .sk-modal {
      background-color: ${whichskin.modalBg};
      box-shadow: 0px 0px 10px ${whichskin.modalBs};
      color: ${whichskin.modalC};
    }
    .sk-modal-header {
      background-color: ${whichskin.modalHeaderBg};
      color: ${whichskin.modalHeaderC};
      border-bottom: 1px solid ${whichskin.modalHeaderBorder};
    }
    .sk-modal-footer {
      border-top: 1px solid ${whichskin.modalFooterBt};
    }

    .sk-table {
      background-color: ${whichskin.tableBg};
      color: ${whichskin.tableC};
    }
    .sk-table-header {
      background-color: ${whichskin.tableHeaderBg};
    }
    .sk-table-header th{
      border-bottom: 2px solid ${whichskin.tableHeaderThBorder};
    }
    .sk-table-header th i{
      border-right: 1px solid ${whichskin.tableHeaderI};
    }
    .sk-table-body tr {
      background-color: ${whichskin.tableBodyTrBg};
    }
    .sk-table-body td {
      border-bottom: 1px solid ${whichskin.tableBodyTdBorder};
    }
    .sk-table-active {
      background-color: ${whichskin.tableTrActiveBg} !important;
    }

    .sk-panel {
      box-shadow: 0 1px 3px ${whichskin.panelBs};
    }
    .sk-panel-header {
      background-color: ${whichskin.panelHeaderBg};
    }
    .sk-panel-body {
      background-color: ${whichskin.panelBodyBg};
    }
    .sk-panel-active {
      background-color: ${whichskin.panelActiveBg};
    }

    .sk-datetime .rdtPicker{
      background-color: ${whichskin.dateTimeBg};
    }

    input, select, textarea {
      background-color: ${whichskin.formBg};
      border: 1px solid ${whichskin.formBor};
      color: ${whichskin.formC};
    }
    button {
      background-color: ${whichskin.buttonBg};
      border: 1px solid ${whichskin.buttonBorder};
      color: ${whichskin.buttonTxt};
    }
    button:hover {
      background-color: ${whichskin.buttonHov};
    }
    .sk-block {
      background-color: ${whichskin.blockBg};
    }


  `
}

const setSkinStyle = (whichskin: any) => {
  const styleText = getSkinStyle(whichskin);
  const oldStyle = document.getElementById('skin')!;
  const style = document.createElement('style');
  style.id = 'skin';
  style.type = 'text/css';
  style.innerHTML = styleText;
  if (oldStyle && style) {
    document.head.replaceChild(style, oldStyle)
  } else {
    document.head.appendChild(style);
  }
}

setSkinStyle(skin.darkBlue)

export { skin, setSkinStyle }
