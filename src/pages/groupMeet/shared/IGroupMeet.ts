export interface IMeet{
  streamCamera: MediaStream | null,
  streamAudio: MediaStream | null,
  streamMonitor: MediaStream | null
}

export interface IStreamSource {
  name: string
}

export interface IItemCall {
  name: string
  streamVideo: MediaStream | null,
  streamAudio: MediaStream | null
}
