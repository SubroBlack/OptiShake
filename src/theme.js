const theme = {
  colors: {
    //OptiShake Black #26282e rgb(38, 40, 46)
    // OptiShake Orange #e87b2e rgb(232, 123, 46)
    textPrimary: "rgb(38, 40, 46)",
    textSecondary: "rgb(88, 96, 105)",
    lightText: "rgb(255, 255, 255)",
    error: "rgb(247, 17, 5)",

  },
  backgroundColors: {
    primary: "rgb(3, 102, 214)",
    baseColor: "rgb(232, 123, 46)",
    //baseColor: "rgb(200, 200, 200)",
    darkThrough: "rgba(38, 40, 46, 0.75)",
    dark: "rgb(38, 40, 46)",
    light: "rgb(255, 255, 255)",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: "sans-serif",
    android: "roboto",
    iOS: "arial"
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  padding: {
    thin: 4,
    medium: 8,
    thick: 16,
    big: 32
  },
  margin: {
    thin: 4,
    medium: 8,
    thick: 16,
    big: 32,
  },
  borders: {
    thin: 1,
    medium: 2,
    thick: 4,
    big: 8
  },
  display: {
    flexContainer: "flex",
  },
  alignItems: {
    center: "center",
  },
  justifyContent: {
    spaced: "space-around",
  },
  card: {
    display: "flex",
    backgroundColor: "rgb(38, 40, 46)",
    borderRadius: 6,
    margin: 8,
    padding: 8,
  },
  imageSize: {
    small: 64,
    medium: 128,
    large: 256,
  }, 
  columnsDisplay: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "spaced-around",
    alignItems: "center"
  },
  button: {
    padding: 16,
    backgroundColor: "rgb(38, 40, 46)",
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
    borderRadius: 4,
    textAlign: "center",
  },
  headerText: {
    color: "rgb(38, 40, 46)",
    fontWeight: "700",
    fontSize: 16,
    marginHorizontal: 8,
    paddingVertical: 8,
    textAlign: "center",
  },
  subHeaderText: {
    color: "rgba(38, 40, 46, 0.75)",
    fontWeight: "700",
    fontSize: 16,
    marginHorizontal: 6,
    paddingVertical: 6,
  },
  invisible: {
    display: "none"
  }
};

export default theme;
