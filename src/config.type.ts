export type ConfigDestination = {
  baseUrl: string
  fallbackPath?: string
}

export type ContentMapping = {
  toPath: string
  fromPath: string[] | string
}

export type Config = {
  version: '2020.3.0'
  destination: ConfigDestination
  contentMappings: ContentMapping[]
}
