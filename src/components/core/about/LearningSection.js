

const learningSection=()=>{
    const LearningGridArray = [
        
        {
          order: 1, 
          heading: "Curriculum Based on Industry Needs",
          description: 
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        }, 
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description: 
              "Studynotion partners with more than 275+ leading universities and companies to bring",
          },
          {
            order: 5,
            heading: "Ready to Work",
            description: 
              "Studynotion partners with more than 275+ leading universities and companies to bring",
          },
        ];

    return (
        <div>
            {
                learningSection.map((element,index)=>{
                    return <div key={index}>
                        <p>{element.heading}</p>
                        <p>{element.description}</p>
                    </div>
                })
            }
        </div>
    );

}

export default learningSection;
