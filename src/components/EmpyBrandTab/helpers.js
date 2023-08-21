import {store} from '../../store'
const spinConnectTitle = store.getState().authReducer.appTitles.spinConnect

export const placeholderTexts = {
    arts: {
        one:"Upload your phygital art NFTs and",
        two: "connect them with SPIN connect IoT labels"
    },
    store: {
        one:"Upload your phygital fashion NFTs and",
        two: `connect them with ${spinConnectTitle} IoT labels`
    },
    worlds: {
        one:"Create your own metaverse world",
        two: "and host retail events and art exhibitions"
    },
}
