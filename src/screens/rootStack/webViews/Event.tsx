import React from 'react';
import WebViewComponent from '../../../components/WebViewComponent';
import { EventStackProps, NoticeStackProps } from '../../../types/types';

interface Uri {
    uri: string
}

function Event({ route }: EventStackProps): JSX.Element  {
    const { uri }: Uri = route.params ?? { uri: '' }

    return (
        <WebViewComponent uri={ uri } />
    )
}

export default Event
