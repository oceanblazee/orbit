const { AoiClient, LoadCommands } = require("aoi.js");
const { AoiVoice, PlayerEvents, PluginName, Cacher, Filter } = require("@akarui/aoi.music");
const { Panel } = require("@akarui/aoi.panel");
const { InviteManager } = require("@akarui/aoi.invite");

const client = new AoiClient({
  token: "Discord Bot Token",
  prefix: "Discord Bot Prefix",
  intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    dbType: "KeyValue",
    tables: ["main"],
    securityKey: "8a0f076dfa3b1a6ccfa277bc19d5dfb3",
  }
});

const voice = new AoiVoice(client, {
    searchOptions: {
        youtubegl: "US",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
    },
});

voice.addPlugin(PluginName.Cacher, new Cacher("memory"));

voice.addPlugin(
    PluginName.Filter,
    new Filter({
        filterFromStart: false,
    }),
);

voice.bindExecutor(client.functionManager.interpreter);

const panel = new Panel({
  port: 3000,
  client: client,
});

panel.loadAPI({
  auth: "b0e9f4db53c61289c8f5aa3ef57d39db",
});

panel.loadGUI({
  username: ["username 1", "username 2"],
  password: ["Password 1", "Password 2"],
});

new InviteManager(client, {
    sk: "a-32-characters-long-string-here",
}, ["inviteJoin", "inviteLeave"]);

const loader = new LoadCommands(client);
loader.load(client.cmd, "./commands")