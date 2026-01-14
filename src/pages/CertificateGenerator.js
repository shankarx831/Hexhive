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
        <main className="flex-grow pb-20">
            <section className="relative bg-primary text-white py-20 text-center mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black font-heading mb-4">Internship Certificate</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Generate and download your internship completion certificate.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 border border-gray-100">
                    <h2 className="text-2xl font-bold text-primary border-b-2 border-gray-100 pb-4 mb-8">
                        Enter Intern Details
                    </h2>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <fieldset className="space-y-6 border-none p-0 m-0">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name (Auto-Caps)</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="DHINESH U"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Register Number</label>
                                    <input
                                        type="text"
                                        name="regNo"
                                        value={formData.regNo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">College Name</label>
                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all appearance-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Internship Topic</label>
                                <textarea
                                    name="topic"
                                    rows="2"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-y"
                                />
                            </div>

                            {/* ROW: Date and Certificate ID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Date of Issue</label>
                                    <input
                                        type="date"
                                        name="issueDate"
                                        value={formData.issueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all appearance-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Certificate ID</label>
                                    <input
                                        type="text"
                                        name="certificateId"
                                        value={formData.certificateId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* ROW: Signatory */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Signatory (Tech Lead)</label>
                                <div className="relative">
                                    <select
                                        name="signatory"
                                        value={formData.signatory}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="V. Durai Murugan">V. Durai Murugan</option>
                                        <option value="R. Devanath">R. Devanath</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                        </fieldset>

                        <div className="pt-4 text-center">
                            <PDFDownloadLink
                                document={<CertificatePDF data={pdfData} />}
                                fileName={`Certificate_${formData.name.replace(/\s+/g, '_')}.pdf`}
                                className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-accent hover:bg-accent-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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


export default CertificateGenerator;