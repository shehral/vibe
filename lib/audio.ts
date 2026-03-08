import { Howl, Howler } from 'howler'

type SFXName =
  | 'click'
  | 'hover'
  | 'warp'
  | 'mission-complete'
  | 'dialogue-blip'
  | 'success'
  | 'error'
  | 'rank-up'

class AudioManager {
  private ambient: Howl | null = null
  private sfx: Map<SFXName, Howl> = new Map()
  private _muted: boolean = false
  private _volume: number = 0.5
  private initialized: boolean = false

  init() {
    if (this.initialized) return
    this.initialized = true

    // Load mute preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vibe-voyager-muted')
      this._muted = saved === 'true'
      Howler.mute(this._muted)
    }
  }

  private getOrCreateSFX(name: SFXName): Howl {
    if (!this.sfx.has(name)) {
      this.sfx.set(
        name,
        new Howl({
          src: [`/audio/sfx/${name}.mp3`],
          volume: this._volume,
          preload: true,
        }),
      )
    }
    return this.sfx.get(name)!
  }

  playAmbient() {
    if (!this.ambient) {
      this.ambient = new Howl({
        src: ['/audio/ambient-space.mp3'],
        loop: true,
        volume: this._volume * 0.3, // ambient is quieter
        preload: true,
      })
    }
    if (!this.ambient.playing()) {
      this.ambient.play()
    }
  }

  stopAmbient() {
    this.ambient?.stop()
  }

  playSFX(name: SFXName) {
    if (this._muted) return
    try {
      const sound = this.getOrCreateSFX(name)
      sound.play()
    } catch {
      // Silently fail if audio file doesn't exist yet
    }
  }

  setVolume(volume: number) {
    this._volume = Math.max(0, Math.min(1, volume))
    Howler.volume(this._volume)
  }

  toggleMute(): boolean {
    this._muted = !this._muted
    Howler.mute(this._muted)
    if (typeof window !== 'undefined') {
      localStorage.setItem('vibe-voyager-muted', String(this._muted))
    }
    return this._muted
  }

  get muted() {
    return this._muted
  }

  get volume() {
    return this._volume
  }
}

// Singleton
export const audio = new AudioManager()
