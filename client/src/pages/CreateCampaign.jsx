import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money, loader } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const { createCampaign } = useStateContext();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[16px] sm:p-10 p-5 shadow-lg">
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center z-50 rounded-[16px]">
          <img src={loader} alt="loading" className="w-12 h-12 animate-spin" />
        </div>
      )}

      <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] mb-6">
        <h1 className="font-epilogue font-bold sm:text-[26px] text-[20px] leading-[36px] text-white">
          🚀 Start a Campaign
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 z-10">
        <div className="flex flex-wrap gap-6">
          <FormField
          name="name"
            lableName="Your Name *"
            placeHolder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            lableName="Campaign Title *"
            placeHolder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          lableName="Story *"
          placeHolder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-semibold text-[20px] sm:text-[24px] text-white ml-5">
            You will receive 100% of the raised amount.
          </h4>
        </div>

        <div className="flex flex-wrap gap-6">
          <FormField
            lableName="Goal *"
            placeHolder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            lableName="End Date *"
            placeHolder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          lableName="Campaign Image *"
          placeHolder="Paste image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-4">
          <CustomButton
            btnType="submit"
            title="Submit New Campaign"
            styles="bg-gradient-to-r from-[#1dc071] to-[#17a862] h-[48px] px-6 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
