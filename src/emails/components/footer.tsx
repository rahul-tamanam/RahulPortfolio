import { Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components'

function Footer() {
  return (
    <>
      <Hr className='mt-6 mb-3' />
      <Section>
        <Row className='mt-4' align='left' width='auto'>
          <Column className='pr-6 align-middle'>
            <Link href='https://github.com/rahultamanam/nelsonlai.dev' className='text-xl text-black'>
              <Img src='https://nelsonlai.dev/images/email/github.png' alt='GitHub' width={22} height={22} />
            </Link>
          </Column>
          <Column className='pr-6 align-middle'>
            <Link href='https://www.linkedin.com/in/rahultamanam' className='text-xl text-black'>
              <Img
                src='https://cdn.simpleicons.org/linkedin/0A66C2'
                alt='LinkedIn'
                width={22}
                height={22}
              />
            </Link>
          </Column>
          <Column className='align-middle'>
            <Link href='mailto:rahul.tamanam@gmail.com' className='text-xl text-black'>
              <Img
                src='https://cdn.simpleicons.org/gmail/EA4335'
                alt='Gmail'
                width={22}
                height={22}
              />
            </Link>
          </Column>
        </Row>
      </Section>
      <Text className='mx-0 mt-6 mb-0 p-0 text-xs font-normal text-gray-500'>
        © {new Date().getFullYear()} Rahul Tamanam. All rights reserved.
      </Text>
    </>
  )
}

export default Footer
