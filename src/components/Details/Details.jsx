import { Box, Typography, Divider } from "@mui/material";

const Details = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        component="img"
        sx={{ height: 375, margin: "auto", borderRadius: 10 }}
        src="https://www.creativeboom.com/uploads/articles/07/07ce01e00f639f2cb0423886f647bf19bb12c01e_1620.jpg"
        alt="This is a placeholder image"
      ></Box>
      <Box>
        <Typography component="h2" variant="h4">
          Title of Site
        </Typography>
      </Box>
      <Divider component="div" variant="presentation" />
      <Box sx={{ display: "flex", gap: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "10rem",
          }}
        >
          <Typography component="p" variant="p" sx={{ fontWeight: "bold" }}>
            Address:
          </Typography>
          <Typography component="p" variant="p" sx={{ textAlign: "center" }}>
            123 Main Street, Saint Paul, MN
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "10rem",
          }}
        >
          <Typography component="p" variant="p" sx={{ fontWeight: "bold" }}>
            Architect:
          </Typography>
          <Typography component="p" variant="p">
            Picasso
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "10rem",
          }}
        >
          <Typography
            component="p"
            variant="p"
            sx={{ fontWeight: "bold", color: "secondary" }}
          >
            Year Built:
          </Typography>
          <Typography component="p" variant="p">
            1967
          </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
        <Typography component="p" variant="p" sx={{ fontWeight: "bold" }}>
          Description
        </Typography>
        <Typography component="p" variant="p" sx={{width: '50rem'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non leo a
          lacus lacinia pulvinar id ut ligula. Cras bibendum tellus accumsan,
          venenatis massa id, posuere velit. Suspendisse auctor leo non justo
          elementum viverra. Etiam a convallis ipsum, non ultricies ex. Integer
          ligula urna, feugiat lacinia purus posuere, tempor finibus mauris. Nam
          sit amet aliquam felis. Nunc ultrices nec diam quis malesuada.
          Suspendisse non metus diam. Ut feugiat, lacus sit amet facilisis
          placerat, metus nulla vulputate nunc, et pretium augue nunc vel odio.
          Pellentesque mollis quam ex, vel porttitor nulla maximus et.
          Vestibulum quis accumsan sapien. Aliquam mattis nunc aliquam hendrerit
          pulvinar. Aliquam ut accumsan erat. Aenean ac est lacus. Nam neque
          urna, ullamcorper vel pellentesque sed, ullamcorper eget ex.
          Vestibulum rutrum vel est eu sagittis. Etiam elementum sagittis mauris
          et rhoncus. Vivamus auctor aliquet justo sed faucibus. Donec id odio
          vel odio posuere rutrum. Maecenas faucibus malesuada turpis fermentum
          sodales. Nam tincidunt neque eget rhoncus posuere. Aenean tellus
          ligula, rutrum et volutpat vitae, consectetur efficitur est. Cras a
          quam id ipsum elementum pellentesque ut eu felis.
        </Typography>
      </Box>
    </Box>
  );
};

export default Details;
