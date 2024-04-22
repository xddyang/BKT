import React, { useState } from "react";
import { NavBar, TabBar } from "antd-mobile";
import { AppOutline, ContentOutline, UserOutline } from 'antd-mobile-icons';
import Home from './home/index.jsx';
import List from './list/index.jsx';
import User from './user/index.jsx';
import util from '../../util/util.js';
import './index.less';

const Main = () => {
	const [selectedTab, setSelectedTab] = useState(util.getUrlParams(window.location.search)?.type);

	const tabList = [
		{ key: 'home', title: '首页', icon: <AppOutline />, component: <Home /> },
		{ key: 'list', title: '列表', icon: <ContentOutline />, component: <List /> },
		{ key: 'user', title: '个人中心', icon: <UserOutline />, component: <User /> },
	];

	const renderComponent = () => {
		const selectedComponent = tabList.find(tab => tab.key === selectedTab);
		return selectedComponent ? selectedComponent.component : null;
	};

	const changeTab = (key) => {
		setSelectedTab(key);
		window.history.pushState(null, null, `/tabbar/${key}`);
	};

	return (
		<div className='app'>
			<div className='top'>
				<NavBar backArrow={false}>{ tabList.find(v => v.key === selectedTab)?.title }</NavBar>
			</div>
			<div className='body'>
				{ renderComponent() }
			</div>
			<div className='bottom'>
				<TabBar activeKey={selectedTab} onChange={key => changeTab(key)}>
					{tabList.map(item => (
						<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
					))}
				</TabBar>
			</div>
		</div>
	)
};

export default Main;