import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificatePDF from '../components/CertificatePDF';

const CertificateGenerator = () => {
    // State management
    const [formData, setFormData] = useState({
        name: 'SHANKAR R',
        regNo: '25UIT187',
        college: "Sri Manakula Vinayagar Engineering College, Madagadipet, Puducherry – 605107",
        startDate: '2025-06-05',
        endDate: '2025-07-13',
        topic: 'Cloud-Native Deployment of Full-Stack Applications Using Microsoft Azure',
        issueDate: '2025-07-13',
        certificateId: 'HEX/INT/2025/101', // NEW FIELD DEFAULT
        signatory: 'V. Durai Murugan'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Auto-Caps for Name
        if (name === 'name') {
            setFormData({ ...formData, [name]: value.toUpperCase() });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Date Formatters
    const formatDateForPDF = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
    };

    const formatIssueDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const getSuffix = (d) => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };
        return `${day}${getSuffix(day)} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Data passed to PDF
    const pdfData = {
        ...formData,
        startDate: formatDateForPDF(formData.startDate),
        endDate: formatDateForPDF(formData.endDate),
        issueDate: formatIssueDate(formData.issueDate)
    };

    return (
        <main>
            {/* Custom CSS for Dates & Select */}
            <style>
                {`
                    input[type="date"], select {
                        appearance: none;
                        -webkit-appearance: none;
                        color: #333;
                        font-family: inherit;
                        border: 1px solid #ddd;
                        background: #fff;
                        padding: 12px;
                        border-radius: 4px;
                        width: 100%;
                        font-size: 1rem;
                    }
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        cursor: pointer;
                        filter: invert(0.4) sepia(1) saturate(3) hue-rotate(130deg);
                        opacity: 0.7;
                    }
                    input:focus, select:focus, textarea:focus {
                        outline: 2px solid #1E9E96;
                        border-color: #1E9E96;
                    }
                `}
            </style>

            <section className="hero hero--program">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Internship Certificate </h1>
                        <p className="hero-subtitle">
                        
                        </p>
                    </div>
                </div>
            </section>

            <section className="form-section container" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
                <div className="form-card" style={{
                    background: '#fff',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{
                        borderBottom: '2px solid #f0f0f0',
                        paddingBottom: '15px',
                        marginBottom: '25px',
                        color: '#004d40',
                        fontSize: '1.5rem'
                    }}>
                        Enter Intern Details
                    </h2>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <fieldset style={{ border: 'none', padding: 0 }}>

                            <div className="form-row">
                                <div>
                                    <label style={labelStyle}>Full Name (Auto-Caps)</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="DHINESH U"
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Register Number</label>
                                    <input type="text" name="regNo" value={formData.regNo} onChange={handleChange} style={inputStyle} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={labelStyle}>College Name</label>
                                <input type="text" name="college" value={formData.college} onChange={handleChange} style={inputStyle} />
                            </div>

                            <div className="form-row">
                                <div>
                                    <label style={labelStyle}>Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={labelStyle}>Internship Topic</label>
                                <textarea name="topic" rows="2" value={formData.topic} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
                            </div>

                            {/* ROW: Date and Certificate ID */}
                            <div className="form-row">
                                <div>
                                    <label style={labelStyle}>Date of Issue</label>
                                    <input
                                        type="date"
                                        name="issueDate"
                                        value={formData.issueDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Certificate ID</label>
                                    <input
                                        type="text"
                                        name="certificateId"
                                        value={formData.certificateId}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                            
                            {/* ROW: Signatory */}
                            <div className="form-group" style={{marginTop: '15px'}}>
                                <label style={labelStyle}>Signatory (Tech Lead)</label>
                                <select
                                    name="signatory"
                                    value={formData.signatory}
                                    onChange={handleChange}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <option value="V. Durai Murugan">V. Durai Murugan</option>
                                    <option value="R. Devanath">R. Devanath</option>
                                </select>
                            </div>

                        </fieldset>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <PDFDownloadLink
                                document={<CertificatePDF data={pdfData} />}
                                fileName={`Certificate_${formData.name.replace(/\s+/g, '_')}.pdf`}
                                className="btn btn-primary btn-lg"
                                style={{
                                    width: '100%',
                                    display: 'block',
                                    textAlign: 'center',
                                    textDecoration: 'none'
                                }}
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Generating PDF...' : 'Download Certificate'
                                }
                            </PDFDownloadLink>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

// Styles
const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '0.9rem'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
};

export default CertificateGenerator;