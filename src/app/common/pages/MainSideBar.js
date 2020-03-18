import React from 'react';
import {connect} from 'react-redux';
import {injectIntl, defineMessages} from 'react-intl';
import {Link, withRouter} from 'react-router';
import classNames from 'classnames';
import {formatMessage, Div, DerivedStateComponent} from 'cassiopae-core';

const messages = defineMessages({
    searchPlaceHolder: {id: 'core.main.search.placeholder', defaultMessage: 'Search...'},
    online: {id: 'core.main.online', defaultMessage: 'Online'},
    mainNavigation: {id: 'core.main.navigation', defaultMessage: 'Main navigation'}
});

const ID = 'MainSideBar';

class MenuItemsComponent extends React.Component {

    renderSubItems(subItems, baseRoute, currentRoute, parentId) {
        const {intl} = this.props;

        if (!subItems || !subItems.length) {
            return [];
        }

        const children = subItems.map((subItem, index) => {
            const {label, title, visible, route, id, className, icon} = subItem;

            if (!visible) {
                return;
            }

            const _label = formatMessage(intl, label || title);

            const targetRoute = (baseRoute || '') + route;
            const cls = {
                active: (targetRoute === currentRoute),
            };

            const _id = id && parentId && (parentId + '.' + id) || undefined;

            return <li key={id || route || index} className={classNames(cls, className)} data-rxcid={_id}>
                <Link id={_id} to={targetRoute}>
                    {icon ? <i className={icon}/> : <i className='fa fa-circle-o'/>}
                    <span>{_label}</span>
                </Link>
            </li>;

        });

        const items = <ul className='treeview-menu'>{children}</ul>;
        return items;
    }

    handleExpandMenu = (event) => {
        const {id, onMenuClick} = this.props;

        onMenuClick(id, event);
    };

    render() {
        const {intl, route, title, icon, subItems, menus, currentRoute, label, id, activeMenus} = this.props;

        const activeMenuStatus = !!activeMenus[id];

        let _label = label || title;
        if (_label) {
            _label = formatMessage(intl, _label);
        }

        const cl = {
            'treeview': true,
            'active': (route === currentRoute),
            'menu-open': activeMenuStatus,
            'menu-close': !activeMenuStatus
        };

        const items = this.renderSubItems((subItems || menus), route, currentRoute, id);

        if (route && !route.indexOf('http')) {
            return (
                <li key={id} className={classNames(cl)}>
                    <a id={id} href={route}>
                        <i className={icon}/>
                        <span>{_label}</span>
                    </a>
                    {items}
                </li>
            );
        }

        return (
            <li key={id} className={classNames(cl)}>
                <Link id={id}
                      to={items.length ? '' : route}
                      onClick={(event) => this.handleExpandMenu(event)}>
                    <i className={icon}/>
                    <span>{_label}</span>
                    {items.length > 0 && <i className='fa fa-angle-left pull-right'/>}
                </Link>
                {items}
            </li>
        )
    }
}

const MenuItems = injectIntl(MenuItemsComponent);

class MainSideBar extends DerivedStateComponent {

    state = {
        activeMenus: {},
    };

    static _getDerivedStateFromProps(props, state) {
        const {menuItems} = props;
        const pathname = props.location.pathname;

        if (pathname === state.pathname) {
            return {};
        }

        const activeMenus = {};
        findRouteInMenuItems(pathname, menuItems, activeMenus);

        return {
            activeMenus,
            pathname,
        };
    }


    handleMenuClick = (menuKey, event) => {
        this.setState({
            activeMenus: {[menuKey]: true},
        })
    };

    render() {
        const {
            id = ID,
            intl: {formatMessage},
            menuItems,
            topLeftBarCartoucheVisible,
            username,
        } = this.props;
        const {activeMenus, pathname: currentRoute} = this.state;


        let _menuItems = false;
        if (Array.isArray(menuItems)) {
            _menuItems = menuItems.map((menuItem) => {
                if (!menuItem.visible) {
                    return;
                }

                const menuItemId = menuItem.id && (id + '.' + menuItem.id) || undefined;
                return <MenuItems key={menuItem.id}
                                  activeMenus={activeMenus}
                                  onMenuClick={this.handleMenuClick}
                                  currentRoute={currentRoute}
                                  {...menuItem}
                                  id={menuItemId}/>;
            });
        }

        return (
            <Div id={id} className='mainLayout-sidebar' tagName='aside' parentProps={this.props}
                 parentState={this.state}>
                <Div id={id + '.section'} tagName='nav' className='sidebar' parentProps={this.props}
                     parentState={this.state} role="navigation" aria-label='Main navigation'>
                    {topLeftBarCartoucheVisible !== false &&
                    <Div id={id + '.userPanel'} parentProps={this.props} parentState={this.state}>
                        <div className='user-panel'>
                            <div className='pull-left image'>
                                <i className='glyphicon glyphicon-user img-circle'/>
                            </div>
                            <div className='pull-left info'>
                                <p>{username}</p>
                                <a href='#'>
                                    <i className='fa fa-circle text-success'/>
                                    {formatMessage(messages.online)}
                                </a>
                            </div>
                        </div>
                        <form action='#' method='get' className='sidebar-form'>
                            <div className='input-group'>
                                <input type='text' name='q' className='form-control'
                                       placeholder={formatMessage(messages.searchPlaceHolder)}/>
                                <span className='input-group-btn'>
                                    <button type='submit' name='search' id='search-btn' className='btn btn-flat'>
                                        <i className='fa fa-search'/>
                                    </button>
                              </span>
                            </div>
                        </form>
                    </Div>
                    }
                    <ul className='sidebar-menu'>
                        {topLeftBarCartoucheVisible !== false &&
                        <li key='header' className='header'>
                            {formatMessage(messages.mainNavigation)}
                        </li>
                        }
                        {_menuItems}
                    </ul>
                </Div>
            </Div>
        );
    }
}

/**
 *
 * @param {string} path
 * @param {[{}]} menuItems
 * @param {{}} selectedIds
 */
function findRouteInMenuItems(path, menuItems, selectedIds) {
    const selectedMenuItem = menuItems.find((menuItem) => {
        const {route, menus, subItems, visible} = menuItem;

        if (!visible) {
            return;
        }

        if (route === path) {
            return menuItem;
        }

        const sub = (menus || subItems);
        if (!sub) {
            return;
        }

        const selectedSub = findRouteInMenuItems(path, sub, selectedIds);
        return selectedSub;
    });

    if (selectedMenuItem) {
        selectedIds[selectedMenuItem.id] = true;
    }

    return selectedMenuItem;
}

function mapStateToProps(state) {
    return {
        username: state.authentication.username,
        menuItems: state.navigation.menuItems,
        topLeftBarCartoucheVisible: state.authentication.options.topLeftBarCartoucheVisible,
    };
}

export default connect(mapStateToProps)(withRouter(injectIntl(MainSideBar)));
