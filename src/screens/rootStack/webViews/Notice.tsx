import React from 'react';
import WebViewComponent from '../../../components/WebViewComponent';
import { NoticeStackProps } from '../../../types/types';

interface Uri {
    uri: string
}

function Notice({ route }: NoticeStackProps): JSX.Element  {
    const { uri }: Uri = route.params ?? { uri: '' }

    return (
        <WebViewComponent uri={ uri } />
    )
}

export default Notice
