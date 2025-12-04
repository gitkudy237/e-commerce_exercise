<template>
  <div class="faqs-page">
    <div class="container">
      <h1>FAQs</h1>
      
      <div class="faq-section">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFAQ(index)">
            <h3>{{ faq.question }}</h3>
            <span class="faq-toggle">{{ faq.open ? '▲' : '▼' }}</span>
          </div>
          <div class="faq-answer" v-show="faq.open">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQs',
  data() {
    return {
      faqs: [
        {
          question: 'How long does delivery take, after I have ordered?',
          answer: 'Delivery typically takes 3-5 business days for standard shipping. Express delivery options are available for an additional fee.',
          open: false
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and bank transfers for your convenience.',
          open: false
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.',
          open: false
        },
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for all unused items in their original packaging.',
          open: false
        }
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open
    }
  }
}
</script>

<style scoped src="../styles/faqs.css"></style>