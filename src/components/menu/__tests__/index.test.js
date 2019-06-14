import React from 'react'
import { mount } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Menu from '../index'

const menuDock = jest.fn();
menuDock.mockReturnValue([
  {
    "children": [],
    "icon": "logo.png",
    "id": 1,
    "level": 1,
    "name": "一级菜单",
    "show": true,
  }
])

it('menu is work', () => {
  const wrapper = mount(
    <Router>
      <Menu data={menuDock()} />
    </Router>
  )
  expect(wrapper.find('ul').exists()).toBeTruthy();
})