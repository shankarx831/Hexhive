import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// HexHive Theme Colors
const COLOR_DARK = '#0F3D3E';
const COLOR_TEAL = '#1E9E96';
const COLOR_TEXT = '#333333';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
    fontFamily: 'Helvetica',
    position: 'relative',
    overflow: 'hidden',
  },

  // 1. Watermark
  watermark: {
    position: 'absolute',
    top: 150,
    left: -300,
    width: 600,
    height: 600,
    opacity: 0.04,
    zIndex: -1,
  },

  // 2. Header
  header: {
    marginTop: 30,
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 90,
    marginRight: 15,
  },
  logoTextCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoTitle: {
    fontSize: 48,
    color: COLOR_DARK,
    fontFamily: 'Helvetica',
    lineHeight: 1,
    marginBottom: -8,
  },
  logoSubtitle: {
    fontSize: 16,
    color: COLOR_TEAL,
    letterSpacing: 1,
    marginTop: 5,
  },

  // 3. Titles
  titleBlock: {
    alignItems: 'center',
    marginBottom: 35,
  },
  mainHeading: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
    textTransform: 'uppercase',
    marginBottom: 15,
    color: '#000',
  },
  subHeading: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'underline',
    textTransform: 'uppercase',
    color: '#000',
  },

  // 4. Body Text
  bodyContainer: {
    marginHorizontal: 50,
    textAlign: 'justify',
    lineHeight: 1.8,
    fontSize: 11,
    color: COLOR_TEXT,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
    color: '#000',
  },
  paragraph: {
    marginBottom: 15,
  },

  // 5. Signature Section
  footerSection: {
    marginTop: 50,
    marginRight: 50,
    alignItems: 'flex-end',
  },
  forText: {
    fontSize: 11,
    marginBottom: 50,
  },
  nameText: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  roleText: {
    fontSize: 11,
  },

  // 6. Date & ID
  dateText: {
    position: 'absolute',
    left: 50,
    bottom: 200,
    fontSize: 11,
  },
  certIdText: {
    position: 'absolute',
    left: 50,
    bottom: 180, 
    fontSize: 11,
  },

  // 7. Footer Bar & Info
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addressText: {
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLOR_DARK,
    marginBottom: 3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  regText: {
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLOR_DARK,
    marginBottom: 3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  contactText: {
    textAlign: 'center',
    fontSize: 9,
    color: COLOR_DARK,
    marginBottom: 12,
  },
  colorBar: {
    height: 15,
    backgroundColor: '#3FB9B2',
    borderTopWidth: 5,
    borderTopColor: COLOR_TEAL,
    width: '100%',
  }
});

const CertificatePDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* BIG LEFT-SIDE WATERMARK */}
        <Image src={process.env.PUBLIC_URL + "/favicon_transparent.png"} style={styles.watermark} />

        {/* HEADER */}
        <View style={styles.header}>
          <Image src={process.env.PUBLIC_URL + "/favicon_transparent.png"} style={styles.logoImage} />
          <View style={styles.logoTextCol}>
            <Text style={styles.logoTitle}>hexhive</Text>
            <Text style={styles.logoSubtitle}>solutions</Text>
          </View>
        </View>

        {/* TITLES */}
        <View style={styles.titleBlock}>
          {/* Updated Title */}
          <Text style={styles.mainHeading}>CERTIFICATE OF COMPLETION</Text>
          <Text style={styles.subHeading}>TO WHOMSOEVER IT MAY CONCERN</Text>
        </View>

        {/* CONTENT - UPDATED GRAMMAR */}
        <View style={styles.bodyContainer}>
          <Text style={styles.paragraph}>
            This is to certify that <Text style={styles.bold}>{data.name}</Text>, Register Number: <Text style={styles.bold}>{data.regNo}</Text>, from {data.college}, has successfully completed the internship program from <Text style={styles.bold}>{data.startDate}</Text> to <Text style={styles.bold}>{data.endDate}</Text>.
          </Text>

          <Text style={styles.paragraph}>
            Internship Title: <Text style={styles.bold}>{data.topic}</Text>
          </Text>

          <Text style={styles.paragraph}>
            During the internship program, we found him/her to be active, competent, and diligent in learning and executing all assigned tasks. The services rendered were found to be satisfactory.
          </Text>

          <Text style={styles.paragraph}>
            We wish him/her great success in all future endeavors.
          </Text>
        </View>

        {/* DATE & ID */}
        <Text style={styles.dateText}>Date : {data.issueDate}</Text>
        <Text style={styles.certIdText}>Certificate ID : {data.certificateId}</Text>

        {/* SIGNATURE */}
        <View style={styles.footerSection}>
          <Text style={styles.forText}>For <Text style={styles.bold}>Hexhive Solutions</Text></Text>
          <Text style={styles.nameText}>{data.signatory}</Text>
          <Text style={styles.roleText}>Technical Lead</Text>
        </View>

        {/* FOOTER BAR */}
        <View style={styles.footerContainer}>
          <Text style={styles.addressText}>NO.58, CANTEEN STREET, FIRST FLOOR, PONDICHERRY - 605001</Text>
          <Text style={styles.regText}>GSTIN: 34HYFPK1653H1ZE</Text>
          <Text style={styles.contactText}>9751 397500  | hexhive.solutions | hexhivesolutions@gmail.com</Text>
          <View style={styles.colorBar} />
        </View>

      </Page>
    </Document>
  );
};

export default CertificatePDF;