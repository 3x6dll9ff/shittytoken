import {connectWallet, okxReplaces, walletInstalled} from "../../scripts/wallets_connector.js";

import metamask_icon from "../../assets/images/metamask-logo.png";
import rabby_icon from "../../assets/images/rabby-logo.png";
import phantom_icon from "../../assets/images/phantom-logo.png";
import backpack_icon from "../../assets/images/backpack-logo.png";
import okx_icon from "../../assets/images/okx-logo.png";


const ConnectWalletButton = ({wallet, connectType, onWalletConnect}) => {
    const walletNames = {
        metamask: 'Metamask',
        rabby: 'Rabby',
        phantom: 'Phantom',
        backpack: 'Backpack',
    };

    const walletIcons = {
        metamask: metamask_icon,
        rabby: rabby_icon,
        phantom: phantom_icon,
        backpack: backpack_icon,
        default: ''
    };

    return (
        <div
            className={`header-data-popup-connect-wallet-button ${walletInstalled(wallet) ? '' : 'disabled'}`}
            onClick={walletInstalled(wallet) ? () => connectWallet(wallet, connectType, onWalletConnect) : null}
        >
            <div className={`header-data-popup-connect-wallet-button-icon-container`}>
                {okxReplaces(wallet) ? (
                    <img
                        className={`header-data-popup-connect-wallet-button-icon right ${walletInstalled(wallet) ? '' : 'disabled'}`}
                        src={okx_icon}
                        alt={`header-profile-wallet-popup-button-icon`}
                    />
                ) : null}
                <img
                    className={`header-data-popup-connect-wallet-button-icon ${okxReplaces(wallet) ? 'left' : ''} ${walletInstalled(wallet) ? '' : 'disabled'}`}
                    src={walletIcons[wallet]}
                    alt={`header-profile-wallet-popup-button-icon`}
                />
            </div>
            <div
                className={`header-data-popup-connect-wallet-button-wallet-name-container ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                <div
                    className={`header-data-popup-connect-wallet-button-wallet-name ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                    {walletNames[wallet] || wallet} {okxReplaces(wallet) ? '/ OKX Wallet' : ''}
                </div>
                <div
                    className={`header-data-popup-connect-wallet-button-wallet-status ${walletInstalled(wallet) ? 'green' : 'red'}`}>
                    {walletInstalled(wallet) ? 'Installed' : 'Not installed'}
                </div>
            </div>
        </div>
    );
};

export default ConnectWalletButton;