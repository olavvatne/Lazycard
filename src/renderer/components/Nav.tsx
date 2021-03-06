import * as React from 'react';
import { NavLink } from "react-router-dom";

import db from '../model/Database';
import { Topic } from '../model/Database';

export default class Nav extends React.Component<INavProps> {
    public constructor(props: INavProps) {
        super(props);
    }

    private addTopic = (): void => {
        let name = "New Topic";
        if (db.topics.exists(name)) {
            let i = 1;
            do {
                name = `New Topic (${i})`;
                i++;
            } while (db.topics.exists(name));
        }
        db.topics.new(name);
        this.props.onTopicChange();
    }

    private import = () => {
        db.import();
        this.props.onTopicChange();
    }

    public render() {
        return (
            <nav>
                <NavItem name="Due today" icon="drafts" to="/" />
                <NavItem name="All cards" icon="layers" to="/cards/" />
                <NavItem name="Settings" icon="settings" to="/settings" />
                <NavItem name="Import" icon="save_alt" action={this.import} />

                <label>Topics</label>
                {this.props.topics.map(t =>
                    <NavItem key={t.id} name={t.name} icon="bookmark" to={`/topics/${t.id}`} />
                )}
                <NavItem name="Add topic" icon="add" action={this.addTopic} />
            </nav>
        );
    }
}

interface INavProps {
    topics: readonly Topic[]
    onTopicChange(): void
}

const NavItem = (props: INavLink | INavLooseLink | INavButton) => {
    if ((props as INavLooseLink).matchWith) {
        return (
            <NavLink className="nav" exact to={(props as INavLink).to}
                isActive={(_, location) => location.pathname.startsWith((props as INavLooseLink).matchWith)} >
                <i className="material-icons">{props.icon}</i> {props.name}
            </NavLink>
        );
    }

    if ((props as INavLink).to) {
        return (
            <NavLink className="nav" exact to={(props as INavLink).to}>
                <i className="material-icons">{props.icon}</i> {props.name}
            </NavLink>
        );
    }

    return (
        <a href="#" className="nav" onClick={(props as INavButton).action}>
            <i className="material-icons">{props.icon}</i> {props.name}
        </a>
    );
}

interface INav {
    name: string
    icon: string
}

interface INavLink extends INav {
    to: string
}

interface INavLooseLink extends INavLink {
    matchWith: string
}

interface INavButton extends INav {
    action(): void
}