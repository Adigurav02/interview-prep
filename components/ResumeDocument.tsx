import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (optional but recommended for style)
// You can download fonts from Google Fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.ttf' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.ttf', fontWeight: 600 },
  ],
});


// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    padding: 30,
    backgroundColor: '#ffffff',
    color: '#1a202c',
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
});

// Define the structure of your PDF document
export const ResumeDocument = ({ content }: { content: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* We simply render the full text content. 
            For more advanced formatting, you would parse the markdown here. */}
        <Text style={styles.paragraph}>{content}</Text>
      </View>
    </Page>
  </Document>
);