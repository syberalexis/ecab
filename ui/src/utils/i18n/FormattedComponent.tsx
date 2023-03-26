import * as React from "react";
import { injectIntl, intlShape } from 'react-intl';
import {FormattedComponentProps} from "./FormattedComponentProps";

class FormattedComponentWrapped extends React.Component<FormattedComponentProps, any> {
    constructor(props: FormattedComponentProps) {
        super(props);
    }

    static propTypes: React.ValidationMap<any> = {
        intl: intlShape.isRequired
    };

    render() {
        const {component: Component, intl, intlFields, ...rest}: FormattedComponentProps = this.props; // Indispensable pour faire fonctionner le render

        let intls : any = {};
        for (let key in intlFields) {
            if (intlFields.hasOwnProperty(key)) {
                intls[key] = intl.formatMessage({id: intlFields[key]});
            }
        }

        return (
            <Component {...intls} {...rest.props}/>
        );
    }
}

const FormattedComponent = injectIntl(FormattedComponentWrapped);

export default FormattedComponent;