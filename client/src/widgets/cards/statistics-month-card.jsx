import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

export function StatisticsMonCard({ title, totalOrders, totalProductsSold, totalRevenue }) {
    return (
        <Card className="border border-blue-gray-100 shadow-sm p-2 mt-2">
            <CardHeader
                variant="gradient"
                color="gray"
                floated={true}
                shadow={true}
                className="absolute grid h-16 w-50 px-5 md:w-80 -mt-10 shadow-lg place-items-center text-sm md:text-lg"
            >
                {title}
            </CardHeader>
            <CardBody className="pt-10 ">

                <div className=" mt-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                    <Card className=" border shadow-sm">
                        <CardBody className="p-4 text-left">
                            <Typography variant="small" className="font-normal text-blue-gray-600">
                                Total Orders :
                            </Typography>
                            <Typography
                                variant="h4"
                                className="bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text"
                            >
                                {totalOrders}
                            </Typography>


                        </CardBody>

                    </Card>

                    <Card className="border  shadow-sm">
                        <CardBody className="p-4 text-left">
                            <Typography variant="small" className="font-normal text-blue-gray-600">
                                Collected Revenue:
                            </Typography>
                            <Typography
                                variant="h4"
                                className="bg-gradient-to-r from-green-500 to-green-900 text-transparent bg-clip-text"
                            >
                                {totalRevenue} <span style={{ fontSize: "0.5em" }} className="text-gray-600">INR</span>
                            </Typography>

                        </CardBody>

                    </Card>
                    <Card className="border shadow-sm">
                        <CardBody className="p-4 text-left">
                            <Typography variant="small" className="font-normal text-blue-gray-600">
                                Total Products Sold:
                            </Typography>
                            <Typography
                                variant="h4"
                                className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
                            >
                                {totalProductsSold}
                            </Typography>


                        </CardBody>

                    </Card>
                </div>
            </CardBody>
        </Card>
    );
}

export default StatisticsMonCard;
