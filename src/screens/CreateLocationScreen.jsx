import Button from '@/components/button/Button'
import Screen from '@/components/container/Screen'
import Wrapper from '@/components/wrapper/Wrapper'
import Label from '@/components/form/Label'
import React, { useState } from 'react'
import Input from '@/components/form/Input'
import camera from '@/assets/camera.svg'
import location from '@/assets/location.svg'
import categoryList from '@/constants/category'
import Dropdown from '@/components/form/Dropdown'
const CreateLocationScreen = () => {
  const [selection, setSelection] = useState(null);

  return (
    <Screen className='px-4'>
        <form>
            <Button className='w-full my-0 py-10 !bg-transparent border border-dashed' icon={camera} />
            
            <Wrapper col className='my-4'>
                <Dropdown options={categoryList} value={selection} onChange={(option) => setSelection(option)}  />
            </Wrapper>

            <Wrapper className='' col>
                <Input label='Title' required placeholder="Enter the place's name" className='rounded-lg'/>
            </Wrapper>

            <Wrapper className='my-4' col>
                <Input label='Location' required icon={location} placeholder="Enter the address" className='rounded-lg'/>
            </Wrapper>
            
            <Wrapper className='' col>
                <Label>Description</Label>
                <textarea className='w-full h-[150px] focus:ring-1 focus:ring-primary-400 px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg bg-neutral-100 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 resize-none' placeholder='Enter the description' />
            </Wrapper>

            <Wrapper col className='my-4'>
                <Input label='Price' className='rounded-lg' type='number' required/>
            </Wrapper>
           
            <Button className='my-4' primary active>Submit</Button>
        </form>
    </Screen>
  )
}

export default CreateLocationScreen