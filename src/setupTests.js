import '@testing-library/jest-dom'
import { beforeEach } from 'vitest'

if (typeof window !== 'undefined') {
  beforeEach(() => window.localStorage.clear())
}
