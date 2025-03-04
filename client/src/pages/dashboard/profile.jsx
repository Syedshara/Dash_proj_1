import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import img from "@/assets/profile.jpg";

export function Profile() {
  return (
    <>
      <div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 h-full w-full bg-gray-900/10" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4 w-full">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="https://res.cloudinary.com/do3vcj7oi/image/upload/v1740993282/WhatsApp_Image_2025-03-02_at_21.11.33_hrjwsw.jpg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Nan Katrathu
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  Authentic Indian Masala Manufacturer
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-100 px-6 py-10">
            <Typography variant="h4" className="text-blue-gray-700 mb-4">
              Profile Information
            </Typography>
            <Typography variant="medium" className="text-blue-gray-600 indent-8">
              Tradition is our ingredient, and quality is our promise. We believe that the
              essence of great food lies in the purity of its spices. There are no shortcuts
              when it comes to authenticity—every spice we craft is sourced with care,
              processed with dedication, and packed with the rich flavors of India. If a
              spice isn’t fresh, it isn’t worth using, and that’s why we ensure that every
              batch meets the highest standards of purity and taste. We choose the path of
              authenticity, even if it takes longer—because true flavor is never rushed.
              Our mission is to bring the richness of homemade, traditionally blended
              masalas to every kitchen, preserving the heritage of Indian spices for
              generations to come.
            </Typography>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;