/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDashboardApis } from 'root/hooks/useDashboardApis'

const ResponseViewer = () => {
    const apiCall = useDashboardApis()
    const formatJSON = (obj: any) => {
        return JSON.stringify(obj, null, 2)
    }
    const syntaxHighlight = (json: string) => {
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                let cls = 'json-number'
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'json-key'
                    } else {
                        cls = 'json-string'
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean'
                } else if (/null/.test(match)) {
                    cls = 'json-null'
                }
                return `<span class="${cls}">${match}</span>`
            }
        )
    }
    return (
        <div className="response-section">
            <div className="section-title">Response</div>

            {apiCall.isError && (
                <div className="error-state">
                    <div className="error-icon">❌</div>
                    <p>Error: {apiCall.error.message}</p>
                </div>
            )}

            {apiCall.data ? (
                <>
                    <div className="response-header">
                        <span
                            className={`status-badge ${
                                apiCall.data.status >= 200 &&
                                apiCall.data.status < 300
                                    ? 'success'
                                    : 'error'
                            }`}
                        >
                            {apiCall.data.status} {apiCall.data.statusText}
                        </span>
                        <span className="response-time">
                            {apiCall.data.time}ms
                        </span>
                    </div>
                    <div
                        className="response-body"
                        dangerouslySetInnerHTML={{
                            __html: syntaxHighlight(
                                formatJSON(apiCall.data.data)
                            ),
                        }}
                    />
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">📡</div>
                    <p>Send a request to see the response</p>
                </div>
            )}
        </div>
    )
}

export default ResponseViewer
