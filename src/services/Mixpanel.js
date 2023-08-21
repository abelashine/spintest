import mixpanel from "mixpanel-browser";

const MIXPANEL_ACTIVE = process.env.NODE_ENV === "production";

if (MIXPANEL_ACTIVE) {
  mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`);
}

const actions = {
  identify: (id) => {
    if (MIXPANEL_ACTIVE) mixpanel.identify(id);
  },
  alias: (id) => {
    if (MIXPANEL_ACTIVE) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (MIXPANEL_ACTIVE) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (MIXPANEL_ACTIVE) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
