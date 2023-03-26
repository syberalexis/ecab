import { InjectedIntlProps } from 'react-intl';
import * as React from "react";


export interface FormattedComponentProps extends InjectedIntlProps {
    component: React.ComponentType<any>;
    intlFields: any;
    props?: any;
}