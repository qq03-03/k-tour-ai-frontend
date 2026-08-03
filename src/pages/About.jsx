import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PipelineDiagram from '../components/PipelineDiagram.jsx'

const videoPipelineSteps = [
  { icon: '🎬', label: '영상', status: 'done', statusLabel: '✅ 완료' },
  { icon: '✂️', label: 'Scene Detection', status: 'done', statusLabel: '✅ 완료' },
  { icon: '🤖', label: 'VLM', status: 'done', statusLabel: '✅ 완료' },
  { icon: '🏷️', label: 'Metadata', status: 'done', statusLabel: '✅ 완료' },
  { icon: '🧬', label: 'Embedding', status: 'done', statusLabel: '✅ 완료' },
  { icon: '🗄️', label: 'Vector DB', status: 'done', statusLabel: '✅ 완료' },
]

const searchPipelineSteps = [
  { icon: '⌨️', label: '검색', status: 'pending', statusLabel: '🔲 UI 구현 중' },
  { icon: '🧠', label: 'Query Analysis', status: 'pending', statusLabel: '🔲 확인 필요' },
  { icon: '🔎', label: 'Vector Search', status: 'done', statusLabel: '✅ 완료' },
  { icon: '🔀', label: 'RRF', status: 'done', statusLabel: '✅ 완료' },
  { icon: '✨', label: '추천 결과', status: 'pending', statusLabel: '🔲 UI 구현 중' },
]

export default function About() {
  return (
    <div>
      <Header />
      <div style={{ padding: '28px 24px' }}>
        <p style={{ fontSize: 11.5, color: '#64748b', marginBottom: 8 }}>✅ 완료 · 🔲 예정 / 확인 필요</p>
        <PipelineDiagram title="영상 처리 파이프라인" steps={videoPipelineSteps} />
        <PipelineDiagram title="검색 파이프라인" steps={searchPipelineSteps} />
      </div>
      <Footer />
    </div>
  )
}
