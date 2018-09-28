export interface AppModel {
    services: any[];
    components: ComponentModel[];
}

export interface ComponentModel {
    name: string;
    title?: string;
    useServices?: string[];
    createRoute?: boolean;
    routeUrl?: string;
    showInSideNav?: boolean;
}

export interface ServiceModel {
    name: string;
}
