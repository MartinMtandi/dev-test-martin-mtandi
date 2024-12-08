import React, { useState } from 'react';
import styled from 'styled-components';

interface ContactFormProps {
  dealerName: string;
  vehicleTitle: string;
}

const ContactForm = ({ dealerName, vehicleTitle }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in the ${vehicleTitle}. Please contact me with more information.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      <FormTitle>
        <span>Contact {dealerName}</span>
      </FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name*</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email*</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone Number*</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message*</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Enter your message"
          />
        </FormGroup>

        <SubmitButton type="submit">
          Message the Dealer
        </SubmitButton>

        <Disclaimer>
          By clicking "Send Message", you agree to Cars.co.za Terms of Use and Privacy Policy.
          Your information will be shared with the dealer.
        </Disclaimer>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  top: 1rem;
  height: fit-content;
`;

const FormTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  outline: none;
  border:none;
  background-color: var(--primary);
  color: white;
  padding: 0.875rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-hover);
  }
`;

const Disclaimer = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.4;
`;

export default ContactForm;
