import { contactFormSchema, ContactFormSchemaType } from '@/components/page-ui/ContactMe';

type ActionResponse =
    | { success: true }
    | {
          success: false;
          error: {
              message: string;
          };
      };

export async function sendContactForm(values: ContactFormSchemaType): Promise<ActionResponse> {
    const validateFields = contactFormSchema.safeParse(values);

    if (!validateFields.success && validateFields.error) {
        return {
            success: false,
            error: {
                message: validateFields.error.issues[0]?.message || 'Unknown error'
            }
        };
    }

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
        formData.append(key, values[key as keyof typeof values]);
    });
    const url = new URL('https://formspree.io/f/mvoerlqv');

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json'
        }
    });

    if (response.status !== 200 && response.status !== 201) {
        return {
            success: false,
            error: {
                message: 'Something wrong happened and we were not able to save send contact form data.'
            }
        };
    }

    return { success: true };
}
