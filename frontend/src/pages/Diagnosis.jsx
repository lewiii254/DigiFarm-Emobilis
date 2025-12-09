import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

const Diagnosis = () => {
  const { user } = useAuth()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [diagnosis, setDiagnosis] = useState(null)
  const [polling, setPolling] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await api.post('/diagnosis/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      toast.success('Image uploaded! Processing diagnosis...')
      const diagnosisId = response.data.id
      pollDiagnosis(diagnosisId)
    } catch (error) {
      toast.error('Upload failed: ' + (error.response?.data?.error || error.message))
      setUploading(false)
    }
  }

  const pollDiagnosis = async (diagnosisId) => {
    setPolling(true)
    const maxAttempts = 30
    let attempts = 0

    const poll = async () => {
      try {
        const response = await api.get(`/diagnosis/upload/${diagnosisId}/result/`)
        const result = response.data

        if (result.status === 'processed' && result.diagnosis_result) {
          setDiagnosis(result.diagnosis_result)
          setPolling(false)
          toast.success('Diagnosis complete!')
        } else if (result.status === 'failed') {
          toast.error('Diagnosis processing failed')
          setPolling(false)
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(poll, 2000) // Poll every 2 seconds
        } else {
          toast.error('Diagnosis is taking longer than expected')
          setPolling(false)
        }
      } catch (error) {
        toast.error('Failed to fetch diagnosis result')
        setPolling(false)
      }
    }

    poll()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Crop Diagnosis</h1>

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Upload Crop Image</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image (JPEG/PNG)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="input-field"
            />
          </div>
          
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="max-w-md rounded-lg" />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="btn-primary"
          >
            {uploading ? 'Uploading...' : 'Upload & Diagnose'}
          </button>
        </div>
      </div>

      {polling && (
        <div className="card mb-8">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="text-lg">Processing diagnosis... This may take a few moments.</p>
          </div>
        </div>
      )}

      {diagnosis && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Diagnosis Result</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Predicted Issue</h3>
              <p className="text-xl text-primary-600">{diagnosis.predicted_label}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Confidence</h3>
              <p className="text-lg">{(diagnosis.confidence * 100).toFixed(1)}%</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">{diagnosis.recommendations.issue}</p>
                <p className="mb-2">Severity: {diagnosis.recommendations.severity}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Treatment:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {diagnosis.recommendations.treatment?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                {diagnosis.recommendations.recommended_products?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Recommended Products:</h4>
                    <div className="space-y-2">
                      {diagnosis.recommendations.recommended_products.map((product, idx) => (
                        <div key={idx} className="bg-white p-2 rounded">
                          {product.name} ({product.category})
                        </div>
                      ))}
                    </div>
                    <Link to="/marketplace" className="btn-primary mt-4 inline-block">
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Diagnosis

