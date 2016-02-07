if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

export default () => (
    <div className="login-button animated fadeIn">
        <a href="/auth/twitter"><strong>Login</strong> with <strong>Twitter</strong></a>
    </div>
);
