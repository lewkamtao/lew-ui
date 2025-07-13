<template>
    <lew-flex direction="y">
        <lew-alert
            type="error"
            title="Payment Failed"
            content="Your Apple Pay payment failed. Please check your card information."
        />

        <lew-alert
            type="success"
            title="Subscription Successful"
            content="You have successfully subscribed to Apple Music."
        />

        <lew-alert
            type="warning"
            title="Storage Almost Full"
            content="Your iCloud storage is almost full. Please upgrade your storage plan."
        />

        <lew-alert
            type="info"
            title="New Service Available"
            content="Apple Fitness+ is now available. Get professional fitness guidance at home."
        />
    </lew-flex>
</template>
