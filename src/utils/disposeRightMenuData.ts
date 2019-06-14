const changeMenuData = (menuData: any) => {
  const i: number = 0;
  function addAttriute(oldData: any, lev?: number) {
    for (const item of oldData) {
      item.show = true
      item.level = lev ? lev : i
      if (!lev) {
        item.icon = "logo.png"
      }
      if (!item.P004) {
        item.children = []
      }
      if (item.P004 && item.P004.length > 0) {
        const level: number = lev ? lev + 1 : i + 1;
        addAttriute(item.P004, level)
      }
    }
  }
  addAttriute(menuData);
  menuData = JSON.parse(JSON.stringify(menuData).replace(/P001/g, 'name').replace(/P004/g, 'children').replace(/P003/g, 'operate').replace(/P005/g, 'id'));
  return menuData
}

export { changeMenuData }