import React, { useEffect, useState } from 'react';

import { ParamIcon, ParamInfosContainer } from './ProtectionLevel.styled';
import { BiFace, BiCaretDown, BiCaretUp } from 'react-icons/bi';
import ProgressBar from '@ramonak/react-progress-bar';
import { Box, Typography, IconButton } from '../..';
import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { Statistics } from '../../../store/modules/results/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useTranslation } from 'react-i18next';
import { translateText } from '../../../utils/translateApiConfig';

const { Text } = Typography;
enum ProtectionLevelColors {
  'Proteção Leve' = '#FFAE33',
  'Proteção Boa' = '#4ED9A7',
  'Proteção Moderada' = '#0CC3E7',
  'Proteção Alta' = '#4ED9A7',
}

const ParamsInfos: React.FC<{ params: Statistics }> = ({ params }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const { currentLanguage } = useSelector(({ base }: RootState) => base);
  const [indexText, setIndexText] = useState('');

  const handleClick = () => {
    if (
      params[currentUser.role === 'gestor' ? 'team_protection' : 'value'] ===
      null
    )
      return;
    setIsAnalysisOpen(!isAnalysisOpen);
  };

  const icon = isAnalysisOpen ? (
    <BiCaretUp size="18px" color={theme.colors.darkGray} />
  ) : (
    <BiCaretDown size="18px" color={theme.colors.darkGray} />
  );

  const getValues = () => {
    return currentUser.role === 'gestor' ? 'team_protection' : 'value';
  };

  useEffect(() => {
    (async () => {
      if (currentLanguage === 'ptBR') return setIndexText(params.result);
      const translatedText = await translateText(
        params.result,
        currentLanguage.replace(/[^a-z]/g, '')
      );
      setIndexText(translatedText as string);
    })();
  }, [currentLanguage, params]);
  return (
    <>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '45px',
        }}
      >
        <ParamIcon>
          <BiFace color={theme.colors.darkGray} size="28" />
        </ParamIcon>

        <ParamInfosContainer>
          <Text textDecoration="strong">{params.name}</Text>
          <Box params={{ display: 'flex', alignItems: 'flex-end' }}>
            <Text
              color={
                params[getValues()] === null
                  ? theme.colors.black
                  : ProtectionLevelColors[params.result]
              }
              textDecoration="strong"
            >
              <small>
                {params[getValues()] === null || !params.result
                  ? t('notRatedYet')
                  : indexText}
              </small>
            </Text>
          </Box>
          {params[getValues()] !== null && !!params.result && (
            <ProgressBar
              bgColor={ProtectionLevelColors[params.result]}
              height="8px"
              completed={100 - (params[getValues()] || 0) * 100}
              baseBgColor={lighten(0.35, ProtectionLevelColors[params.result])}
              isLabelVisible={false}
            />
          )}
        </ParamInfosContainer>
        <IconButton onClick={handleClick} icon={icon} />
      </Box>
      {isAnalysisOpen && (
        <small>
          <Text color={theme.colors.darkGray}>{params.description}</Text>
        </small>
      )}
    </>
  );
};

export default ParamsInfos;
