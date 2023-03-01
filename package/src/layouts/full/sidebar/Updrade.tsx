import { Box, Typography, Button } from '@mui/material';
import img1 from 'public/images/backgrounds/rocket.png';
import Image from 'next/image';
import Link from 'next/link';

export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h6" mb={1}>Unlimited Access</Typography>
                    <Button color="primary" target="_blank" disableElevation component={Link} href="https://adminmart.com/product/modernize-next-js-admin-dashboard" variant="contained" aria-label="logout" size="small">
                        Upgrade
                    </Button>
                </Box>
                <Box mt="-35px">
                    <Image alt="Remy Sharp" src={img1} width={100} />
                </Box>
            </>
        </Box>
    );
};
