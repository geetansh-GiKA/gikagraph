export interface Connector {
  name: string;
  src: string;
}

export const connectors: Connector[] = [
  { name: "AWS", src: "/Connectors/aws.svg" },
  { name: "Dropbox", src: "/Connectors/dropbox.svg" },
  { name: "Google Drive", src: "/Connectors/google-drive.svg" },
  { name: "MongoDB", src: "/Connectors/mongodb.svg" },
  { name: "MySQL", src: "/Connectors/mysql.png" },
  { name: "OneDrive", src: "/Connectors/onedrive.svg" },
  { name: "Slack", src: "/Connectors/slack.svg" },
  { name: "Salesforce", src: "/Connectors/salesforce.svg" },
  { name: "Notion", src: "/Connectors/notion.svg" },
  { name: "GitHub", src: "/Connectors/github.svg" },
];
